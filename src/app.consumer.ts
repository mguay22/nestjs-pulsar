import { Inject, Injectable } from '@nestjs/common';
import { PulsarConsumer } from './pulsar/pulsar.consumer';
import { PULSAR_CLIENT } from './pulsar/pulsar.constants';
import { Client } from 'pulsar-client';
import { TEST_TOPIC } from './app.constants';

@Injectable()
export class AppConsumer extends PulsarConsumer<any> {
  constructor(@Inject(PULSAR_CLIENT) pulsarClient: Client) {
    super(pulsarClient, {
      topic: TEST_TOPIC,
      subscriptionType: 'Shared',
      subscription: 'nestjs-shared',
    });
  }

  protected handleMessage(data: any) {
    this.logger.log('New message in AppConsumer.', data);
  }
}
