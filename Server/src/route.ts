import express from 'express';
const router = express.Router();

 router.get('/', (req, res) => {
    res.send('how You doing')
})

export default router;
// app.listen( port, () => {
//     // tslint:disable-next-line:no-console
//     console.log( `server started at http://localhost:${ port }` );
// } );