import { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { createUser, deleteUser, getUsers, updateUser } from "../api/userApi";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddUserForm from "../components/AddUserForm";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [openAddNewUserModal, setOpenAddNewUserModal] = useState(false);

    // fetch user from api
    const fetchUsers = async () => {

        try {
            const response = await getUsers();

            if(response.status === 200){
              console.log(users);
              
                setUsers(response.data);
                localStorage.setItem("users", JSON.stringify(response.data));
                toast.success("Users fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || "Failed to fetch users");
        }
    }

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("users"));
        
        if(stored && stored.length > 0) {
          setUsers(stored);
        }else{
          fetchUsers();
        }

    },[]);

    // sync changes whenever user state changes
    useEffect(() => {
      if(users.length > 0) {
        localStorage.setItem("users", JSON.stringify(users));
        console.log(users);
        
      }
    },[users]);

    // Add user handler
    const handleAddUser = async (newUserData) => {
      const {name, email, phone, address, company} = newUserData;

      if (!name.trim()) {
          toast.error("Name cannot be empty");
          return;
      }

      if (!email.trim()) {
          toast.error("Email cannot be empty");
          return;
      }

      if (!phone.trim()) {
          toast.error("Phone cannot be empty");
          return;
      }
      
        try {
          const response = await createUser({
            name,
            email,
            phone,
            address,
            company
          })
          if(response.status === 201){
            
            // Generate new ID because JSONPlaceholder doesn't give unique IDs
          const newId = users.length > 0 
            ? Math.max(...users.map(u => u.id)) + 1 
            : 1;

            const newUser = {...response.data, id: newId};

            console.log(newId);
            console.log(newUser);
            

            setUsers(prev => [...prev, newUser]);
            toast.success("User added successfully");
            setOpenAddNewUserModal(false);
          }
        } catch (error) {
          console.error("Error adding user:", error);
          toast.error(error.response?.data?.message || "Failed to add user");
        }
    }

    // handle update user
    const handleUpdateUser = async (id, updatedUserData) => {
      // if user is fake
      if (id > 10) {
        setUsers(prev =>
            prev.map(u =>
                u.id === id ? { ...u, ...updatedUserData } : u
            )
        );
        toast.success("User updated successfully");
        return;
    }

        try {
            const response = await updateUser(id, updatedUserData);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? response.data : user
                )
            );

            toast.success("User updated successfully");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    }

    // Delete user handler to refresh user list after deletion
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    }


  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <Navbar onAddUser={() => setOpenAddNewUserModal(true)} type={false}/>

        {/* Add User Modal */}
      <Modal 
        isOpen={openAddNewUserModal}
        onClose={() => setOpenAddNewUserModal(false)}
        title="Adding a new User">
          {/* AddUserForm Component */}
          <AddUserForm 
            onAddUser={(newUserData) => handleAddUser(newUserData)}
            types="add"
          />
      </Modal>

      {/* Container */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-sm border border-gray-200 m-4">
        <h1 className="text-lg font-bold text-center mb-6">Users List</h1>

        {/* Responsive Grid */}
        <div 
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-4
          "
        >
            {/* Loading */}
        {
           users.map((user) => (
            <Card user={user} key={user.id} onDelete={() => handleDelete(user.id)} onUpdate={(updatedUserData) => handleUpdateUser(user.id, updatedUserData)}/>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Home;
