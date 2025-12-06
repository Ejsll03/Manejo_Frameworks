import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const AuthCard = ({ mode, formData, message, onChange, onSubmit, onSwitch }) => (
  <Card
    title={mode === 'login' ? 'Inicia sesión' : 'Crea tu acceso'}
    subTitle="Laboratorio privado para ingeniería computacional"
    className="auth-card"
  >
    <form className="auth-form" onSubmit={onSubmit}>
      {mode === 'register' && (
        <div className="auth-field">
          <label htmlFor="name">Nombre completo</label>
          <div className="auth-input">
            <i className="pi pi-id-card" aria-hidden="true" />
            <InputText
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              className="auth-control"
            />
          </div>
        </div>
      )}
      <div className="auth-field">
        <label htmlFor="email">Correo electrónico</label>
        <div className="auth-input">
          <i className="pi pi-envelope" aria-hidden="true" />
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            type="email"
            required
            className="auth-control"
          />
        </div>
      </div>
      <div className="auth-field">
        <label htmlFor="password">Contraseña</label>
        <div className="auth-input">
          <i className="pi pi-lock" aria-hidden="true" />
          <div className="auth-password">
            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              feedback={false}
              toggleMask
              className="auth-password-inner"
              inputClassName="auth-control password-control"
              required
            />
          </div>
        </div>
      </div>
      {message && <small className="auth-message">{message}</small>}
      <Button
        label={mode === 'login' ? 'Ingresar' : 'Registrarme'}
        icon="pi pi-arrow-right"
        type="submit"
        className="auth-submit"
      />
    </form>
    <Divider />
    <Button
      type="button"
      label={mode === 'login' ? '¿Necesitas una cuenta? Regístrate' : '¿Ya tienes acceso? Inicia sesión'}
      link
      onClick={onSwitch}
    />
  </Card>
);

export default AuthCard;
