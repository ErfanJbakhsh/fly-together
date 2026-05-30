import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function RegisterLayout(props: any) {
  const session = await getServerSession(options);
  if (session) redirect("/");
  return <>{props.children}</>;
}
