import React, { useState } from 'react';

/**
 * The "Apply now" form: wide headline, small uppercase tag, two-column grid of labelled fields and
 * the navy submit button. Front-end only: shows the Webflow-style "thank you" state on submit.
 */
export default function FormBlock({ title, tag = 'fill the form', fields, submitLabel = 'Submit', thanks = 'Thank you! Your details have been received.', id, className = '' }) {
  const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setDone(true);
  };
  return (
    <section className={`ice-form-section ${className}`.trim()} id={id}>
      <div className="wrapper_base">
        <div className="apply_headline">
          <h2 className="h2">{title}</h2>
        </div>
        <div className="cta_form">
          <div className="w-form">
            {done ? (
              <div className="w-form-done ice-form-done">
                <div>{thanks}</div>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="tag_form">
                  <div>{tag}</div>
                </div>
                <div className="form_grid">
                  {fields.map((f) => (
                    <div className={`field_box${f.wide ? ' ice-field-wide' : ''}`} key={f.name}>
                      <label htmlFor={f.name} className="field_txt">
                        {f.label}
                        {f.required ? '*' : ''}
                      </label>
                      {f.area ? (
                        <textarea id={f.name} name={f.name} className="input_box area-field w-input" placeholder={f.placeholder} required={f.required} maxLength={5000} />
                      ) : (
                        <input id={f.name} name={f.name} className="input_box w-input" type={f.type || 'text'} placeholder={f.placeholder} required={f.required} maxLength={256} />
                      )}
                    </div>
                  ))}
                  <input type="submit" className="submit_form w-button" value={submitLabel} />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
