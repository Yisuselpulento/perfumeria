import { useEffect, useState } from "react";
import { getAddressesFetching, addAddressFetching, updateAddressFetching, deleteAddressFetching } from "../services/AddressFetching";
import CardAddress from "../components/Address/CardAddress";
import AddressForm from "../components/Address/AddressForm";

const EditProfile = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null); 
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const res = await getAddressesFetching();
      if (res.success) {
        setAddresses(res.addresses);
      }
      setLoading(false);
    };
    fetchAddresses();
  }, []);

  const handleAddOrUpdate = async (addressData) => {
    let res;
    if (selectedAddress) {
      res = await updateAddressFetching(selectedAddress._id, addressData);
    } else {
      res = await addAddressFetching(addressData);
    }

    if (res.success) {
      // recargar direcciones
      const updated = await getAddressesFetching();
      setAddresses(updated.addresses);
      setSelectedAddress(null);
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteAddressFetching(id);
    if (res.success) {
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    }
  };

  return (
    <div className="p-4 md:flex md:gap-6">
      {/* Columna izquierda - lista de direcciones */}
      <div className="md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Tus direcciones</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No tienes direcciones registradas.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {addresses.map((addr) => (
              <CardAddress
                key={addr._id}
                address={addr}
                onEdit={() => {
                  setSelectedAddress(addr);
                  setShowForm(true);
                }}
                onDelete={() => handleDelete(addr._id)}
              />
            ))}
          </div>
        )}
        <button
          onClick={() => {
            setSelectedAddress(null);
            setShowForm(true);
          }}
          className="mt-4 bg-primary text-white px-3 py-2 rounded"
        >
          ➕ Agregar dirección
        </button>
      </div>

      {/* Columna derecha (desktop) */}
      <div className="hidden md:block md:w-1/2">
        {showForm && (
          <AddressForm
            initialData={selectedAddress}
            onSubmit={handleAddOrUpdate}
            onCancel={() => {
              setSelectedAddress(null);
              setShowForm(false);
            }}
          />
        )}
      </div>

      {/* Modo móvil: formulario en modal */}
      {showForm && (
        <div className="md:hidden  fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-stone-900 rounded-lg p-4 w-[90%]">
            <AddressForm
              initialData={selectedAddress}
              onSubmit={handleAddOrUpdate}
              onCancel={() => {
                setSelectedAddress(null);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;