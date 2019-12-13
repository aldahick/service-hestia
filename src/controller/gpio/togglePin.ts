import { Controller, HttpMethod } from "@aldahick/service-utils";
import * as joi from "@hapi/joi";
import { Request, Response } from "express";
import * as rpio from "rpio";

// Outputs a warning when not running on an RPi, not useful for this project
rpio.removeAllListeners("warn");

export class ToggleGpioPinController extends Controller {
  version = "1";
  method = HttpMethod.Post;
  route = "/gpio/pins/:pin";

  async handle(req: Request<{ pin: string }>, res: Response) {
    joi.assert(req.params, joi.object({
      pin: joi.string().regex(/^[0-9]+$/).required()
    }));

    joi.assert(req.body, joi.object({
      ms: joi.number().optional()
    }));

    const pin = Number(req.params.pin);
    const { ms } = req.body as { ms: number };

    rpio.open(pin, rpio.OUTPUT, rpio.HIGH);

    await new Promise(resolve => setTimeout(resolve, ms || 1500));

    rpio.write(pin, rpio.LOW);
    rpio.close(pin);

    return { ok: true };
  }
}
