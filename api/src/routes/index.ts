import { Router } from 'express';

const routes = Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Returns test
 *     description: Test description 1
 *     tags: ['Test']
 *     responses:
 *       200:
 *         description: Test description 2
 */
routes.get('/test', (req, res) => {
  return res.send({ message: 'Teste' });
});

export default routes;
