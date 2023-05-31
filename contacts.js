const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
   const data = await fs.readFile(contactsPath, "utf-8")
   return JSON.parse(data);
}
  
async function getContactById(contactId) {
    const id = String(contactId)
    const list = await listContacts()

    const result = list.find(item => item.id === id)
    return result || null
}

async function removeContact(contactId) {
    const id = String(contactId)
    const list = await listContacts();

    const index = list.findIndex(item => item.id === id);

    if (index === -1) {
        return null
    }

    const [deleteItem] = list.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return deleteItem;
}

async function addContact(name, email, phone) {
    const list = await listContacts();

    const newUser = {
        id: nanoid(),
        name,
        email,
        phone
    }

    list.push(newUser);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

    return newUser;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}