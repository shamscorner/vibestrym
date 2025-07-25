import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/common/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/common/dialog';

export function InstructionModal() {
  const t = useTranslations('dashboard.streamKeys.instructionDialog');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{t('trigger')}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('heading')}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <h2 className="mt-5 font-semibold text-lg">{t('step1.title')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('step1.description')}
        </p>

        <ol className="list-inside list-decimal space-y-2 pl-4">
          <li className="text-muted-foreground text-sm">
            <strong>{t('downloadObs.title')}</strong>
            <br />
            {t('downloadObs.description')}{' '}
            <a
              className="text-blue-500 underline hover:text-blue-700"
              href="https://obsproject.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('downloadObs.linkText')}
            </a>
            .
          </li>
          <li className="text-muted-foreground text-sm">
            <strong>{t('copyKeys.title')}</strong>
            <br />
            {t('copyKeys.description')}
          </li>
        </ol>

        <h2 className="mt-4 font-semibold text-lg">{t('step2.title')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('step2.description')}
        </p>

        <ol className="list-inside list-decimal space-y-2 pl-4">
          <li className="text-muted-foreground text-sm">
            <strong>{t('openObs.title')}</strong>
            <br />
            {t('openObs.description')}
          </li>
          <li className="text-muted-foreground text-sm">
            <strong>{t('openStreamSettings.title')}</strong>
            <br />
            {t('openStreamSettings.description')}
          </li>
          <li className="text-muted-foreground text-sm">
            <strong>{t('enterDetails.title')}</strong>
            <br />
            {t('enterDetails.description')}
          </li>
          <li className="text-muted-foreground text-sm">
            <strong>{t('saveSettings.title')}</strong>
            <br />
            {t('saveSettings.description')}
          </li>
        </ol>

        <h2 className="mt-4 font-semibold text-lg">{t('step3.title')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('step3.description')}
        </p>

        <ol className="list-inside list-decimal space-y-2 pl-4">
          <li className="text-muted-foreground text-sm">
            <strong>{t('startStream.title')}</strong>
            <br />
            {t('startStream.description')}
          </li>
          <li className="text-muted-foreground text-sm">
            <strong>{t('monitorStream.title')}</strong>
            <br />
            {t('monitorStream.description')}
          </li>
        </ol>

        <p className="mt-4 text-muted-foreground text-sm">{t('congrats')}</p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">{t('close')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
