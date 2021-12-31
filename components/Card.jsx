export const ContactCard = ({ title, contact }) => {
  return (
    <div className="p-2">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          {"Contacts List: " + title}
        </h2>
        <p className="text-gray-700">{contact}</p>
      </div>
    </div>
  );
};
