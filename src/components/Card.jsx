import { ArrowLeft, ArrowRight, Delete, DeleteIcon, Edit2, LoaderCircle, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
import DeleteAlert from "./DeleteAlert";
import { Link } from "react-router-dom";
import AddUserForm from "./AddUserForm";

const Card = ({user, onDelete, onUpdate}) => {
    const [isDeleteOpenMoal, setIsDeleteOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    const handleUpdate = async (updatedUserData) => {
        await onUpdate(updatedUserData);
        setOpenUpdateModal(false);
    }

  return (
    <div className="flex justify-between p-4 bg-white shadow rounded-xl border hover:shadow-lg transition">
        <div>        
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-gray-500 text-sm mt-1">{user.phone}</p>
            <Link state={{ user }} to={`/user/${user.id}`} className="text-gray-800 text-md mt-1 flex gap-6 cursor-pointer hover:text-blue-800 font-semibold">
                Click here for more Details
            </Link>
        </div>

        <div className="flex flex-col justify-between">
            <button onClick={() => setOpenUpdateModal(true)} className="cursor-pointer"><Edit2 size={15} /></button>
            <button onClick={() => setIsDeleteOpenModal(true)} className="cursor-pointer"><Trash2 size={15}/></button>
        </div>

        {/* Delete Modal */}
        <Modal 
            isOpen={isDeleteOpenMoal}
            onClose={() => setIsDeleteOpenModal(false)}
            title="Delete the User"
        >
            <DeleteAlert 
                content="Are you sure want to delete this user."
                onDelete={onDelete}
            />
        </Modal>

        {/* Edit Modal */}
        <Modal
            isOpen={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            title="Updating the user"
        >
            <AddUserForm 
                onAddUser={handleUpdate}
                userData={user}
                types="update"
            />
        </Modal>
    </div>
    
  );
};

export default Card;
