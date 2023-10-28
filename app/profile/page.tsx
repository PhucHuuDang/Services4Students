import ClientOnly from "../components/ClientOnly";
import getRoleUser from "../components/actions/getRoleUser";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  // const getInfo = await getRole()
  const getInfo = await getRoleUser();

  console.log(getInfo);
  return (
    <div className="p-24">
      <ClientOnly>
        <ProfileClient getInfo={getInfo} />
      </ClientOnly>
    </div>
  );
};

export default ProfilePage;
