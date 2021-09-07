import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
    try {
        const connection = await createConnection("localhost");

        const id = uuidv4();
        const password = await hash("admin", 8);

        await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'name', 'admin@email.com', '${password}', true, 'now()', 'xxxx')
    `);
        await connection.close();
    } catch (err) {
        console.log(err);
    }
}

create().then(() => console.log("admin created"));
