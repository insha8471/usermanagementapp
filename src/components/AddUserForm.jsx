import { useState } from "react";
import Inputs from "./Inputs";
import { LoaderCircle } from "lucide-react";

const AddUserForm = ({ onAddUser , userData , types}) => {
    const [user, setUser] = useState({
        id: userData?.id || null,
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address?.city || userData?.address || "",
        company: userData?.company?.name || userData?.company || ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value
        });
    }

    const handleAddUser = async () => {
        setLoading(true);
        try {
            console.log(user);
            
            types === 'add' ? await onAddUser(user) : await onAddUser(user.id, user);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateUser = async () => {
        setLoading(true);
        try {   
            await onAddUser(user);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Inputs
                value={user.name}
                onChange={(e) => handleChange('name', e.target.value)}
                label='Full Name'
                placeholder="e.g. John Doe"
                type='text'
            />

            <Inputs
                value={user.email}
                onChange={(e) => handleChange('email', e.target.value)}
                label='Email'
                placeholder="e.g. user@example.com"
                type='email'
            />

            <Inputs
                value={user.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                label='Phone'
                placeholder="e.g. 50878-4752-45287"
                type='text'
            />

            <Inputs
                value={user.address}
                onChange={(e) => handleChange('address', e.target.value)}
                label='Address'
                placeholder="e.g. 123 Main St"
                type='text'
            />

            <Inputs
                value={user.company}
                onChange={(e) => handleChange('company', e.target.value)}
                label='Company'
                placeholder="e.g. Acme Corp"
                type='text'
            />

            <div className="flex justify-end mt-6">

            {types === 'add' ? (
                <button 
                    onClick={handleAddUser}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base cursor-pointer">
                    {
                        loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Adding...
                            </>
                        ) : (
                            <>
                                Add User
                            </>
                        )
                    }
                </button>
            ) : (
                <button 
                    onClick={handleUpdateUser}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white font-medium px-3 sm:px-4 py-2 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 active:scale-95 text-sm sm:text-base cursor-pointer">
                    {
                        loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Updating...
                            </>
                        ) : (
                            <>
                                Update User
                            </>
                        )
                    }
                </button>
            )}
            </div>
        </div>
    )
}

export default AddUserForm;