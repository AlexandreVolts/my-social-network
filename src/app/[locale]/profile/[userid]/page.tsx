"use client";

import { Header } from "@/components/Header";
import { Avatar } from "@/components/ui/Avatar";
import { Loader } from "@/components/ui/Loader";
import { useUser } from "@/hooks/useUser";
import { UserData } from "@/types/UserData";
import { getUserInfos } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Profile() {
  const params = useParams();
  const supabase = createClientComponentClient();
  const { user, isComplete } = useUser(supabase);
  const router = useRouter();
  const userFetch = use(getUserInfos(supabase, params.userid as string));
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    console.log(userFetch, params.userid);
    if (!userData) {
      if (userFetch.data && isComplete) {
        setUserData(userFetch.data[0]);
      } else if (userFetch.error && isComplete) {
        if (user?.id) {
          router.push(`/profile/${user.id}`);
          return;
        }
        router.push("/");
      }
    }
  }, [userFetch, userData, isComplete]);

  return (
    <>
      <Header isLoggedIn />
      <main>
        <div className="flex">
          <Avatar
            name={userData?.name ?? ""}
            surname={userData?.surname ?? ""}
            src={userData?.avatar_src}
            size="lg"
          />
          <h2 className="text-bold">{userData?.name} {userData?.surname}</h2>
        </div>
      </main>
    </>
  );
}
