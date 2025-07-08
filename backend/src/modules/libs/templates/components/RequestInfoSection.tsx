import { Heading, Section, Text } from '@react-email/components'
import * as React from 'react'
import { GlobeIcon, SmartphoneIcon, MonitorIcon, MapPinIcon } from 'lucide-react'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

interface RequestInfoSectionProps {
  metadata: SessionMetadata
}

export const RequestInfoSection = ({ metadata }: RequestInfoSectionProps) => {
  return (
    <Section className='bg-gray-50 rounded-xl p-6 mb-8'>
      <Heading className='text-lg font-semibold text-[#18B9AE] mb-4'>
        Request Information:
      </Heading>
      <ul className="list-none pl-0 text-gray-700 text-sm flex flex-col gap-y-2">
        <li className="flex items-center">
          <span className="mr-2 text-[#18B9AE] w-4 h-4 flex items-center justify-center">
            <MapPinIcon size={16} />
          </span>
          <span>Location: {metadata.location?.country}, {metadata.location?.city}</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-[#18B9AE] w-4 h-4 flex items-center justify-center">
            <SmartphoneIcon size={16} />
          </span>
          <span>Operating System: {metadata.device?.os}</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-[#18B9AE] w-4 h-4 flex items-center justify-center">
            <GlobeIcon size={16} />
          </span>
          <span>Browser: {metadata.device?.browser}</span>
        </li>
        <li className="flex items-center">
          <span className="mr-2 text-[#18B9AE] w-4 h-4 flex items-center justify-center">
            <MonitorIcon size={16} />
          </span>
          <span>IP Address: {metadata.ip}</span>
        </li>
      </ul>
      <Text className='text-gray-600 text-sm mt-4'>
        If you did not initiate this request, please ignore this message.
      </Text>
    </Section>
  )
}
