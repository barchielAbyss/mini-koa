import {
  createServer,
  Server,
  RequestListener
} from 'http';

import context from './context';
import request from './request';
import response from './response';

const asyncGetContent = (fn: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await fn();
      resolve(data);
    } catch (err) {
      reject(err)
    }
  })
}

export default class Application {
  server: Server;
  middleware: Array<any> = [];
  context: any;
  request: any;
  response: any;

  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn: any) {
    this.middleware.push(fn);
  }

  listen(port: number, callback: any) {
    this.server = createServer(this.handleRequest);
    this.server.listen(port, callback);
  }

  compose(ctx) {
    const dispatch = (i: number) => {
      if (i === this.middleware.length) {
        return Promise.resolve();
      }
      return Promise.resolve(
        this.middleware[i](
          ctx,
          () => dispatch(i + 1)
        )
      )
    }

    return dispatch(0)
  }

  handleRequest: RequestListener = (request, response) => {
    const cxt = this.createContext(request, response);
    cxt.res.statusCode = 404
    
    this.compose(cxt).then(() => {
      cxt.res.end(cxt.body || '404')
    }).catch((err) => {
      cxt.res.end(err)
    })
  }

  createContext(request: any, response: any) {
    let ctx = Object.create(this.context);
    let req = Object.create(this.request);
    let res = Object.create(this.response);

    ctx.request = req
    ctx.req = ctx.request.req = request

    ctx.response = res
    ctx.res = ctx.response.res = response

    return ctx;
  }
}
