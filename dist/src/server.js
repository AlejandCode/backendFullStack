"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const cors_1 = __importDefault(require("cors"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const producto_route_1 = __importDefault(require("./routes/producto.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const interaction_route_1 = __importDefault(require("./routes/interaction.route"));
class Server {
    constructor() {
        this.apiPaths = {
            usuario: "/api/v1/usuario",
            producto: "/api/v1/producto",
            login: "/api/v1/login",
            interaction: "/api/v1/interaction",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        //base de datos
        (0, connection_1.dbConnection)();
        //Metodos Inciales
        this.middlewares();
        //Rutas
        this.routes();
    }
    miPrimerApi() {
        this.app.get("/", (rea, res) => res.status(200).json({ msg: "Api funcionando" }));
    }
    middlewares() {
        this.app.use((0, cors_1.default)()); //en cors colocar eje www.rios.com q es dominios q se conecte a la api
        //Lectura del Body
        this.app.use(express_1.default.json());
        this.miPrimerApi();
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        this.app.use(this.apiPaths.producto, producto_route_1.default);
        this.app.use(this.apiPaths.login, auth_route_1.default);
        this.app.use(this.apiPaths.interaction, interaction_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo por el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map