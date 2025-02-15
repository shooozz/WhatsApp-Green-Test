import compose from 'compose-function';
import { withToast } from '@/app/providers/with-toast';
import { withStrict } from '@/app/providers/with-strict';

export const withProviders = compose(withStrict, withToast);
