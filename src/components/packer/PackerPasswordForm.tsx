
import React, { useState } from "react";

interface PasswordFormProps {
  onPasswordSubmit: (password: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasswordForm;
