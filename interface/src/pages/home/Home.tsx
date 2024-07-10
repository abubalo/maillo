import EmailView from "../../components/emailWidgets/EmailView";
import Sidebar from "../../components/ui/sidebar/Sidebar";

const Home = () => {
  return (
    <main className="flex">
      <Sidebar/>
      <EmailView />
    </main>
  );
};

export default Home;
