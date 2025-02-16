import compose from 'compose-function';
import { withToast } from '@/app/providers/with-toast';
import { withStrict } from '@/app/providers/with-strict';
import { withRouter } from '@/app/providers/with-router';
import { withGreenApiClientCtx } from '@/app/providers/with-green-api-context';
import { withPhoneNumberCtx } from '@/app/providers/with-phone-number-context';

export const withProviders = compose(
  withStrict,
  withRouter,
  withGreenApiClientCtx,
  withPhoneNumberCtx,
  withToast
);
