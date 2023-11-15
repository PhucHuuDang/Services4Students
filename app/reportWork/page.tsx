import ClientOnly from "../components/ClientOnly";
import getRoleUser from "../components/actions/getRoleUser";
import ReportWorkClient from "./ReportWorkClient";

const ReportWorkPage = async () => {
  const getRole = await getRoleUser();

  return (
    <ClientOnly>
      <div>
        <ReportWorkClient getRole={getRole} />
      </div>
    </ClientOnly>
  );
};

export default ReportWorkPage;
