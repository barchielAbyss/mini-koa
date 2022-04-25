import {
  createServer,
  Server,
  RequestListener
} from 'http';

import context from './context';
import request from './request';
import response from './response';

export default class Application {
  server: Server;
  useFn: any;
  context: any;
  request: any;
  response: any;

  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(fn: any) {
    this.useFn = fn;
  }

  listen(port: number, callback: any) {
    this.server = createServer(this.handleRequest);
    this.server.listen(port, callback);
  }

  handleRequest: RequestListener = (request, response) => {
    const cxt = this.createContext(request, response);
    this.useFn(cxt)
    cxt.res.end(cxt.body)
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
