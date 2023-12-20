import axios from "axios";

export default class Media {
    async GetAllSonglist() {
        try {
            const Reponse = await axios.get("http://localhost:3500/allsongs");

            if (Reponse.status === 200) return Reponse.data;
            else return 0;
        } catch (error) {
            console.log('"allsongs" endpoint media class error', error.message);
            return 0;
        }
    }

    async GetAllMediaSongList() {
        try {
            const Reponse = await axios.get("http://localhost:3500/allmedia");

            if (Reponse.status === 200) return Reponse.data;
            else return 0;
        } catch (error) {
            console.log('"allsongs" endpoint media class error', error.message);
            return 0;
        }
    }

    async GetAllUser() {
        try {
            const Reponse = await axios.get("http://localhost:3500/alluser");

            if (Reponse.status === 200) return Reponse.data;
            else return 0;
        } catch (error) {
            console.log('"alluser" endpoint media class error', error.message);
            return 0;
        }
    }
}
