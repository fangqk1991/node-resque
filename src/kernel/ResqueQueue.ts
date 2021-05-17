import { Resque } from './Resque'

export class ResqueQueue {
  public static async removeQueue(queue: string) {
    await Resque.redis().del(`resque:queue:${queue}`)
    await Resque.redis().srem(`resque:queues`, queue)
  }

  public static async queueSize(queue: string) {
    return Resque.redis().llen(`resque:queue:${queue}`)
  }

  public static async queues() {
    const queues = await Resque.redis().smembers(`resque:queues`)
    queues.sort()
    return queues
  }
}
