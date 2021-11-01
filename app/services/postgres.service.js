const pg = require("pg");

class PostgresService {
    constructor() {
        this.connectionString = 'postgresql://postgres:Aleja-123@localhost:5432/areaVerde'
        this.pool = new pg.Pool(
            { connectionString: this.connectionString }
        );
    };

    async executeSql(sql) {
        try {
            let result = await this.pool.query(sql);
            return result;
        } catch (error) {
        };
    };
};
module.exports = PostgresService;