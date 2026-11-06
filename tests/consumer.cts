import * as api from '@lp-labs/url-path-joiner';
import { joinUrlPath } from '@lp-labs/url-path-joiner';
console.log(joinUrlPath('/api/', 'v1', 'users'));
// @ts-expect-error invalid argument must be rejected by declarations
api.joinUrlPath(4, 'users');
