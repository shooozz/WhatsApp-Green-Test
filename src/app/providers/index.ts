import compose from "compose-function";
import { withToast } from '@/app/providers/with-toast';

export const withProviders = compose(withToast);