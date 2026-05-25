--
-- PostgreSQL database dump
--

\restrict t8lvrNQoWzbb6JzbYjIpGTxi5tSwMjYO4m2RSuIpmG8ccS7lAecYvYblF8g340p

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: template_schema; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA template_schema;


ALTER SCHEMA template_schema OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metadata (
    id integer NOT NULL,
    metadata_name character varying(100) NOT NULL,
    emoji character varying(10) DEFAULT '🎉'::character varying NOT NULL,
    color character varying(7) DEFAULT '#3498DB'::character varying NOT NULL
);


ALTER TABLE public.metadata OWNER TO postgres;

--
-- Name: metadata_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metadata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metadata_id_seq OWNER TO postgres;

--
-- Name: metadata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metadata_id_seq OWNED BY public.metadata.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    item_name character varying(255) NOT NULL,
    metadata_id integer NOT NULL,
    description text NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status boolean DEFAULT false NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: metadata id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata ALTER COLUMN id SET DEFAULT nextval('public.metadata_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Data for Name: metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metadata (id, metadata_name, emoji, color) FROM stdin;
1	Music	🎶	#6200b2
2	Sports	🥅	#fc9f00
3	Games	🎮	#e20000
4	Technology	💻	#0dc200
5	Art	🎨	#ea0075
6	Food & Drink	🍻	#ebf700
7	Networking	👥	#00ddff
8	Other	🎉	#3498DB
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, item_name, metadata_id, description, start_time, end_time, status) FROM stdin;
3	Generic Item A	3	Generic description for item A.	2026-03-20 11:00:00-05	2026-03-20 13:00:00-05	t
1	Generic Item B	1	Generic description for item B.	2026-03-10 19:00:00-05	2026-03-10 21:00:00-05	t
2	Generic Item C	2	Generic description for item C.	2026-03-15 20:00:00-05	2026-03-15 22:00:00-05	t
4	Generic Item D	1	Generic description for item D.	2026-03-25 18:00:00-05	2026-03-25 20:00:00-05	t
5	Test Item E	2	Test	2026-03-03 23:35:00-06	2026-03-05 23:35:00-06	f
\.


--
-- Name: metadata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metadata_id_seq', 8, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 11, true);


--
-- Name: metadata metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: idx_item_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_item_name ON public.items USING gin (to_tsvector('english'::regconfig, (item_name)::text));


--
-- Name: idx_items_metadata; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_items_metadata ON public.items USING btree (metadata_id);


--
-- Name: idx_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_status ON public.items USING btree (status);


--
-- Name: idx_start_time; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_start_time ON public.items USING btree (start_time);


--
-- Name: items items_metadata_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_metadata_fkey FOREIGN KEY (metadata_id) REFERENCES public.metadata(id);


--
-- PostgreSQL database dump complete
--

\unrestrict t8lvrNQoWzbb6JzbYjIpGTxi5tSwMjYO4m2RSuIpmG8ccS7lAecYvYblF8g340p
