export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthday: string;
  occupation: string;
  timezone: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    birthday?: string;
    occupation?: string;
  };
}

export const validateSignup = (data: SignupData): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  // 檢查信箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = '無效的信箱格式。';
  }

  // 檢查密碼長度
  if (data.password.length < 8) {
    errors.password = '密碼至少需要 8 個字元。';
  }

  // 檢查密碼是否包含大小寫字母和數字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(data.password)) {
    errors.password = '密碼需包含大小寫字母及數字。';
  }

  // 檢查確認密碼是否一致
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = '確認密碼與密碼不一致。';
  }

  // 檢查名稱是否提供
  if (!data.name.trim()) {
    errors.name = '請輸入您的姓名。';
  }

  // 檢查生日格式（YYYY-MM-DD）
  const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!birthdayRegex.test(data.birthday)) {
    errors.birthday = '生日格式需為 YYYY-MM-DD。';
  }

  // 檢查職業是否提供
  if (!data.occupation.trim()) {
    errors.occupation = '請輸入您的職業。';
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};
