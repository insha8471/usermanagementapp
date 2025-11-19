import Navbar from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const UserDetails = () => {
    const { state } = useLocation();
    const user = state?.user;

    const address = user?.address || {};
    const geo = address.geo || {};
    const company = user?.company || {};

    return (
        <div>
            <Navbar type={true} />

            <div className="min-h-screen bg-slate-100">
                <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 m-4">
                    <h1 className="text-lg font-bold text-center mb-6">User Detail</h1>

                    <Link to="/" className="flex items-center gap-2 text-blue-700 mb-4">
                        <ArrowLeft size={18} />
                        Back to Users
                    </Link>

                    <div className="bg-white p-6 rounded-xl shadow border max-w-xl mx-auto">
                        <h1 className="text-2xl font-bold mb-4 text-center">
                            {user.name}
                        </h1>

                        {/* Basic Info */}
                        <div className="space-y-2 text-gray-700">
                            <p><span className="font-semibold">Username:</span> {user?.username || user?.name}</p>
                            <p><span className="font-semibold">Email:</span> {user?.email}</p>
                            <p><span className="font-semibold">Phone:</span> {user?.phone}</p>
                        </div>

                        {/* Address */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Address</h2>
                            <div className="space-y-1 text-gray-700">
                                <p><span className="font-semibold">Street:</span> {address?.street || address}</p>
                                <p><span className="font-semibold">Suite:</span> {address?.suite || "Block-2"}</p>
                                <p><span className="font-semibold">City:</span> {address?.city || "India"}</p>
                                <p><span className="font-semibold">Zipcode:</span> {address?.zipcode || "347424"}</p>
                                <p><span className="font-semibold">Geo:</span> {geo.lat || "N/A"}, {geo.lng || "N/A"}</p>
                            </div>
                        </div>

                        {/* Company */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Company</h2>
                            <div className="space-y-1 text-gray-700">
                                <p><span className="font-semibold">Name:</span> {company.name || company}</p>
                                <p><span className="font-semibold">CatchPhrase:</span> {company.catchPhrase || "Amazing service"}</p>
                                <p><span className="font-semibold">BS:</span> {company.bs || "e-commerce"}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
