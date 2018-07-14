CREATE TABLE public.users
(
  username character varying(16) NOT NULL,
  datejoined timestamp without time zone NOT NULL DEFAULT now(),
  birthday timestamp without time zone,
  name character varying(50),
  country character varying(50),
  hash character varying(200) NOT NULL,
  email character varying(200) NOT NULL,
  accountactivated character varying(3) NOT NULL DEFAULT 'yes'::character varying,
  "isAdmin" boolean DEFAULT false,
  gender integer DEFAULT 2,
  CONSTRAINT "Users_pkey" PRIMARY KEY (username),
  CONSTRAINT "Users_email_key" UNIQUE (email),
  CONSTRAINT "Users_country_check" CHECK (country::text ~* '^[a-zA-Z]{2}'::text),
  CONSTRAINT "Users_name_check" CHECK (name::text ~* '[a-zA-Z ]{1,50}'::text),
  CONSTRAINT "Users_username_check" CHECK (username::text ~* '^[a-zA-Z][a-zA-Z0-9_]{4,15}'::text)
);
CREATE TABLE public.profile
(
  username character varying(16) NOT NULL,
  about character varying(2000) DEFAULT ''::character varying,
  interests character varying(2000),
  CONSTRAINT profile_pk PRIMARY KEY (username),
  CONSTRAINT fk_profil_users FOREIGN KEY (username)
      REFERENCES public.users (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE public.session
(
  sid character varying NOT NULL,
  sess json NOT NULL,
  expire timestamp(6) without time zone NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (sid)
);
CREATE TABLE public.media
(
  type character varying(2) NOT NULL,
  datecreated timestamp without time zone NOT NULL DEFAULT now(),
  username character varying(16) NOT NULL,
  title character varying(50) NOT NULL,
  description character varying(2000),
  mediaid character varying(10) NOT NULL,
  "isThumbnail" boolean DEFAULT false,
  CONSTRAINT pk_media PRIMARY KEY (mediaid),
  CONSTRAINT fk_media_users FOREIGN KEY (username)
      REFERENCES public.users (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT media_username_check CHECK (username::text ~* '^[a-zA-Z][a-zA-Z0-9]{4,50}'::text)
);

CREATE TABLE public."like"
(
  username character varying(16) NOT NULL,
  dateliked timestamp without time zone NOT NULL DEFAULT now(),
  mediaid character varying(10) NOT NULL,
  CONSTRAINT pk_like PRIMARY KEY (username, mediaid),
  CONSTRAINT fk_like_media FOREIGN KEY (mediaid)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_like_users FOREIGN KEY (username)
      REFERENCES public.users (username) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE public.music
(
  length integer,
  file_type character varying(5),
  mediaid character varying(10) NOT NULL,
  thumbnail character varying(10),
  CONSTRAINT music_pk PRIMARY KEY (mediaid),
  CONSTRAINT "fk_musicThumb_media" FOREIGN KEY (thumbnail)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_music_media FOREIGN KEY (mediaid)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
CREATE TABLE public.picture
(
  "Size" integer,
  width integer,
  height integer,
  file_type character varying(5),
  mediaid character varying(10) NOT NULL,
  thumbnail character varying(10),
  CONSTRAINT picture_pk PRIMARY KEY (mediaid),
  CONSTRAINT fk_picture_media FOREIGN KEY (mediaid)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE public.tag
(
  tag character varying(30) NOT NULL,
  mediaid character varying(10) NOT NULL,
  CONSTRAINT tag_pk PRIMARY KEY (tag, mediaid),
  CONSTRAINT fk_tag_media FOREIGN KEY (mediaid)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE public.video
(
  length integer,
  width integer,
  height integer,
  file_type character varying(5),
  mediaid character varying(10) NOT NULL,
  thumbnail character varying(10),
  CONSTRAINT video_pk PRIMARY KEY (mediaid),
  CONSTRAINT "fk_videoThumb_media" FOREIGN KEY (thumbnail)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk_video_media FOREIGN KEY (mediaid)
      REFERENCES public.media (mediaid) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
