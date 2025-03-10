import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="h-[60px] w-full md:pl-56 fixed inset-y-0 z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-56">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-[60px] h-full ">
                {children}
            </main>
        </div>
    );
}
export default DashboardLayout;