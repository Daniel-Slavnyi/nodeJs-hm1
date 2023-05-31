const contacts = require("./contacts");

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const invokeAction = async ({action, id, name, email, phone}) => {
    switch (action) {
        case "listContacts":
            const list = await contacts.listContacts();
            return console.log(list);
        case "itemContacts":
            const item = await contacts.getContactById(id);
            return console.log(item);
        case "deleteContacts":
                const deleteItem = await contacts.removeContact(id);
                return console.log(deleteItem);
        case "addContacts":
                const newUser= await contacts.addContact(name, email, phone);
                return console.log(newUser);
        default:
            break;
    }
}

const arr = hideBin(process.argv)
const {argv} = yargs(arr)

invokeAction(argv);

// invokeAction({action: "listContacts"})
// invokeAction({action: "itemContacts", id: "AeHIrLTr6JkxGE6SN-0Rw"})
// invokeAction({action: "deleteContacts", id: "AeHIrLTr6JkxGE6SN-0Rw"})
// invokeAction({action: "addContacts", name: "You are", email: "the best", phone: "developer"})