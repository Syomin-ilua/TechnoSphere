const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload({
    createParentPath: true,
}));

app.post("/upload", async (req, res) => {

    const basePath = "./public/products-images/";

    const publicPrefix = "/products-images/";

    const allowedExtension = ["png", "jpg", "webp", "jpeg"];

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "Вы не выбрали файлы для загрузки на сервер"
            });
        } else {
            const data = [];

            if (!req.files.images) {
                res.send({
                    status: false,
                    message: "Неправильный запрос. Список файлов должен быть предоставлен списком files"
                });

                return;
            }

            for (const key in req.files.images) {
                const file = req.files.images[key];

                const extension = file.name.substring(file.name.lastIndexOf(".") + 1);

                if (!allowedExtension.includes(extension)) {
                    delete file.data;

                    res.send({
                        status: false,
                        message: `Файлы данного типа ${extension} нельзя загружать на сервер`,
                        file
                    });

                    return;
                }

                file.mv(basePath + file.name);

                data.push({
                    name: publicPrefix + file.name,
                    oldName: file.name,
                    extension,
                    mimetype: file.mimetype,
                    size: file.size
                });
            }

            res.send({
                status: true,
                message: "Все файлы загружены",
                data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


app.listen(3001, () => console.log("Server Started..."));