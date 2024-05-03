CREATE SCHEMA auth;

CREATE SCHEMA tasks;

CREATE TABLE IF NOT EXISTS auth.users
(
    id integer NOT NULL DEFAULT nextval('auth.users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS auth.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS tasks.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks.tasks_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    due_date date,
    completed boolean NOT NULL,
    user_id bigint,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS tasks.tasks
    OWNER to postgres;