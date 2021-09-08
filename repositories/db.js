import pg from "pg";

async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }

    const pool = new pg.Pool({
        connectionString: "postgres://gnaljagg:QNLYD6tBJFVFgAo7LSjRSCS-Gy3Qif-u@chunee.db.elephantsql.com/gnaljagg"
    });
    global.connection = pool;
    return pool.connect();

}

export {
    connect
}