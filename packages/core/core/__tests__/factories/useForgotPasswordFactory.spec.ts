import { useForgotPasswordFactory } from '../../src/factories';

const factoryParams = {
  resetPassword: jest.fn(),
  changePassword: jest.fn()
};

const useForgotPassword = useForgotPasswordFactory(factoryParams);
const useForgotPasswordMethods = useForgotPassword();

describe('[CORE - factories] useForgotPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('initial setup', () => {
    it('should have proper initial properties', () => {
      const useForgotPassword = useForgotPasswordFactory(factoryParams);
      const { result, token } = useForgotPassword();

      expect(result.value).toEqual('');
      expect(token.value).toEqual('');
    });
  });
  describe('methods', () => {
    describe('reset', () => {
      it('generates reset password token', async () => {
        const mockedResetPasswordToken = '1234';
        factoryParams.resetPassword.mockReturnValueOnce(mockedResetPasswordToken);
        await useForgotPasswordMethods.reset({ email: 'john.doe@gmail.com' });
        expect(useForgotPasswordMethods.token.value).toEqual(mockedResetPasswordToken);
      });

      it('throws error', async () => {
        const err = new Error('test-568-08989');
        factoryParams.resetPassword.mockImplementationOnce(() => {
          throw err;
        });
        await useForgotPasswordMethods.reset('' as any);
        await expect(useForgotPasswordMethods.error.value.result).toBe(err);
      });

      it('finally loading go to false', () => {
        expect(useForgotPasswordMethods.loading.value).toBe(false);
      });
    });
    describe('change', () => {
      it('return registered user', async () => {
        const mockedResult = true;
        factoryParams.changePassword.mockReturnValueOnce(mockedResult);
        await useForgotPasswordMethods.change({ tokenValue: '1234', newPassword: '1234' });
        expect(useForgotPasswordMethods.result.value).toEqual(mockedResult);
      });
      it('throws error', async () => {
        const err = new Error('test-568-5687565');
        factoryParams.changePassword.mockImplementationOnce(() => {
          throw err;
        });
        await useForgotPasswordMethods.change('' as any);
        expect(useForgotPasswordMethods.error.value.result).toBe(err);
      });
      it('finally loading go to false', () => {
        expect(useForgotPasswordMethods.loading.value).toBe(false);
      });
    });
  });
});