# service-hestia

Home automation endpoints served from several Raspberry Pis.

## Notes

Running in Docker requires `-v /dev/gpiomem:/dev/gpiomem`.

## Endpoints

### `POST /v1/gpio/pins/:pin`

#### Body

```json
{
  "ms": 1500
}
```

Toggles a pin (physically-referenced, `:pin`) on the RPi for `ms` milliseconds. Used for garage door open/close, and other things probably.
