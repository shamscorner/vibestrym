import { SessionMetadata } from '@microservices/core';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries';
import { LocaleData } from 'i18n-iso-countries';
import * as CountriesData from 'i18n-iso-countries/langs/en.json';

import { AppConfig } from '../../config/app.config';

countries.registerLocale(CountriesData as LocaleData);

import DeviceDetector = require('device-detector-js');

export function getSessionMetadata(
  configService: ConfigService,
  request: Request,
  userAgent: string
): SessionMetadata {
  const isDevelopment =
    configService.get<AppConfig['env']['type']>('NODE_ENV') === 'development';

  let ip: string | undefined;

  if (isDevelopment) {
    ip = '118.179.72.209';
  } else if (request.headers['cf-connecting-ip']) {
    ip = Array.isArray(request.headers['cf-connecting-ip'])
      ? request.headers['cf-connecting-ip'][0]
      : request.headers['cf-connecting-ip'];
  } else if (request.headers['x-forwarded-for']) {
    ip =
      typeof request.headers['x-forwarded-for'] === 'string'
        ? request.headers['x-forwarded-for'].split(',')[0]
        : request.headers['x-forwarded-for'][0];
  } else {
    ip = request.ip;
  }

  const location = lookup(ip || '');
  const device = new DeviceDetector().parse(userAgent);

  const metadata: SessionMetadata = {
    location: undefined,
    device: undefined,
    ip
  };

  if (location) {
    metadata.location = {
      country: countries.getName(location.country, 'en') || 'Unknown',
      city: location.city || 'Unknown',
      latitude: location.ll[0] || 0,
      longitude: location.ll[1] || 0
    };
  }

  if (device) {
    metadata.device = {
      browser: device.client?.name || '',
      os: device.os?.name || '',
      type: device.device?.type || ''
    };
  }

  return metadata;
}
