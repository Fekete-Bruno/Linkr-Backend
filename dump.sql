--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: u8vapk8eu46440
--

CREATE SCHEMA heroku_ext;


ALTER SCHEMA heroku_ext OWNER TO u8vapk8eu46440;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    comment character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO fkwuwkslxyhcap;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.follows (
    id integer NOT NULL,
    "followerId" integer NOT NULL,
    "followedId" integer NOT NULL
);


ALTER TABLE public.follows OWNER TO fkwuwkslxyhcap;

--
-- Name: follows_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.follows_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.follows_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: follows_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.follows_id_seq OWNED BY public.follows.id;


--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag character varying(255) NOT NULL
);


ALTER TABLE public.hashtags OWNER TO fkwuwkslxyhcap;

--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hashtags_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.likes OWNER TO fkwuwkslxyhcap;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO fkwuwkslxyhcap;

--
-- Name: postsHashtags; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public."postsHashtags" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL
);


ALTER TABLE public."postsHashtags" OWNER TO fkwuwkslxyhcap;

--
-- Name: postsHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public."postsHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."postsHashtags_id_seq" OWNER TO fkwuwkslxyhcap;

--
-- Name: postsHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public."postsHashtags_id_seq" OWNED BY public."postsHashtags".id;


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: reposts; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.reposts (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.reposts OWNER TO fkwuwkslxyhcap;

--
-- Name: reposts_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.reposts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reposts_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: reposts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.reposts_id_seq OWNED BY public.reposts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(36) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO fkwuwkslxyhcap;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    img text,
    password character varying(64) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO fkwuwkslxyhcap;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: fkwuwkslxyhcap
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO fkwuwkslxyhcap;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: follows id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.follows ALTER COLUMN id SET DEFAULT nextval('public.follows_id_seq'::regclass);


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: postsHashtags id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public."postsHashtags" ALTER COLUMN id SET DEFAULT nextval('public."postsHashtags_id_seq"'::regclass);


--
-- Name: reposts id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.reposts ALTER COLUMN id SET DEFAULT nextval('public.reposts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.comments (id, "userId", "postId", comment, "createdAt") FROM stdin;
1	16	67	Um comentário legal	2022-10-25 10:42:20.040574
2	16	67	Bom comentário	2022-10-25 14:05:09.546564
3	16	67	AAAA	2022-10-25 15:06:29.097804
4	16	67	Um comentario	2022-10-25 15:09:45.756896
5	16	68	Comentário	2022-10-25 15:10:57.985775
6	16	68	Teste	2022-10-25 15:11:35.695215
7	16	68	Mais um teste	2022-10-25 15:12:08.032622
8	20	68	Bruno	2022-10-25 15:16:20.944809
9	20	68	aaa	2022-10-25 15:22:02.611026
10	20	67	Comentário do Bruno	2022-10-25 16:12:10.010383
11	20	68	bbb	2022-10-25 16:13:49.022619
12	20	64	Nayara	2022-10-25 17:07:11.419506
13	21	68	Saviooo	2022-10-25 17:57:01.608331
14	10	45	legal	2022-10-25 19:31:23.912101
15	15	68	to vendo isso aqui já!	2022-10-25 20:38:08.460298
16	15	68	to vendo isso aqui já!	2022-10-25 20:38:08.662456
17	10	68	opa	2022-10-25 21:17:19.65762
18	10	68	oi	2022-10-25 21:18:46.685661
19	16	64	Comentário teste 	2022-10-25 21:21:49.677333
20	10	68	resolviii uhuuuul	2022-10-25 22:23:17.430361
21	10	68	resolviii uhuuuul	2022-10-25 22:23:17.431636
22	10	68	resolviii uhuuuul	2022-10-25 22:23:17.432124
23	10	68	resolviii uhuuuul	2022-10-25 22:23:17.51906
24	16	68	Testeee	2022-10-26 10:36:54.864712
25	16	68	Testeee	2022-10-26 10:36:54.864757
26	16	68	Mais um teste	2022-10-26 10:39:18.636032
27	16	68	Mais um teste	2022-10-26 10:39:18.76644
28	16	68	Autor	2022-10-26 11:42:05.656173
29	16	68	Opa nay	2022-10-26 12:06:30.169908
30	13	60	teste	2022-10-26 17:20:13.244846
31	16	81	Yago	2022-10-26 19:50:55.260535
32	15	81	Yago	2022-10-28 21:10:28.077812
33	15	81	Yago	2022-10-28 21:10:48.39843
34	15	69	Yago?	2022-10-28 21:11:01.118037
35	15	62	Yago???!?!?!	2022-10-28 21:11:18.108913
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.follows (id, "followerId", "followedId") FROM stdin;
69	13	10
70	13	16
72	16	20
73	16	13
75	7	16
76	7	13
77	7	19
78	7	10
79	7	6
80	7	15
81	15	16
82	15	13
83	15	7
84	15	18
86	18	15
41	20	16
44	10	19
45	10	20
47	10	13
48	10	6
50	10	16
57	10	18
68	10	7
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.hashtags (id, hashtag) FROM stdin;
10	quarta
1	primeira
4	segunda
9	terceira
18	quinta
35	duck
38	hashtags
40	aqui
41	tentativas
47	bananas
42	de
51	the
50	of
49	breath
58	godriven
59	today
60	hashtag
61	busca
62	trending
64	novissimahashtag
52	wild
66	novanovissima
67	novissima
68	news
69	snake_case
70	com-hifen
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.likes (id, "postId", "userId", "createdAt") FROM stdin;
3	11	7	2022-10-22 00:56:33.469086
5	12	7	2022-10-22 00:57:35.55299
8	44	1	2022-10-22 01:07:02.490191
9	44	2	2022-10-22 01:07:06.025465
10	44	3	2022-10-22 01:07:09.246812
11	11	3	2022-10-22 01:08:48.532701
12	1	3	2022-10-22 01:13:33.509687
13	1	7	2022-10-22 01:13:57.342138
14	1	6	2022-10-22 01:14:00.746566
102	54	7	2022-10-23 04:04:49.494833
108	44	7	2022-10-23 04:28:25.237166
109	39	7	2022-10-23 04:28:33.709283
111	54	10	2022-10-23 10:46:55.520959
115	49	10	2022-10-23 13:25:55.648015
32	40	10	2022-10-22 12:59:14.36269
116	48	10	2022-10-23 13:26:02.580669
39	42	10	2022-10-22 18:47:24.738074
123	26	10	2022-10-23 13:41:15.725746
124	54	18	2022-10-23 17:03:39.748685
126	49	18	2022-10-23 17:03:59.778636
127	45	18	2022-10-23 17:20:32.4348
46	39	13	2022-10-22 20:25:32.842076
128	23	18	2022-10-23 17:20:39.273949
50	44	10	2022-10-23 02:21:03.564404
138	61	10	2022-10-24 20:08:11.310625
139	23	10	2022-10-24 20:08:20.315857
144	67	16	2022-10-25 00:58:01.102904
145	57	18	2022-10-25 10:22:17.540915
146	68	16	2022-10-25 13:12:10.683472
148	68	7	2022-10-25 18:49:16.230309
149	64	7	2022-10-25 18:49:23.209872
151	59	13	2022-10-26 17:21:42.562998
152	61	13	2022-10-28 02:44:30.014349
154	82	15	2022-10-28 21:09:58.609554
155	81	15	2022-10-28 21:10:15.725417
156	80	15	2022-10-28 21:10:18.68325
84	37	7	2022-10-23 03:54:50.770024
85	38	7	2022-10-23 03:55:16.040816
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.posts (id, "userId", url, description, "createdAt") FROM stdin;
1	7	https://github.com/Fekete-Bruno	Check out my #GitHub profile! #dev #driven	2022-10-19 13:26:24.644082
6	7	https://www.amazon.us		2022-10-19 13:30:08.090189
7	7	https://www.youtube.com/watch?v=p7YXXieghto	Very #educational video! Worth a watch!!	2022-10-20 15:59:56.931948
8	7	https://github.com/Fekete-Bruno/Linkr-Backend	Check out the #BackEnd of this application!!	2022-10-20 16:01:26.670873
9	7	https://github.com/Fekete-Bruno/Linkr-FrontEnd	Check out the #FrontEnd of this application!!	2022-10-20 16:02:26.304384
10	7	www.google.com	testing the #frontend	2022-10-20 16:05:38.266334
11	7	www.driven.com.br	#dev #driven	2022-10-20 16:07:40.889438
12	7	www.driven.com.br	duplicates	2022-10-20 16:09:47.825179
13	7	www.driven.com.br	duplicate2	2022-10-20 16:14:29.972947
14	7	www.google.com		2022-10-20 16:17:28.835134
16	7	www.youtube.com	kgmaekgmaelkgmealkgm	2022-10-20 19:11:43.749545
20	7	www.twitter.com		2022-10-20 20:36:18.359263
21	13	https://twitch.tv	Aquele site roxo. Jogando #hashtags#juntas e #separadas no meio e no final. #penultima #fim	2022-10-20 21:12:15.599595
69	7	https://twitter.com	Testing new posts	2022-10-26 11:22:59.147783
18	15	www.bing.com	buscador da microsoft que ninguém usa	2022-10-20 20:16:14.358407
80	7	https://YouTube.com		2022-10-26 13:18:16.178797
23	10	https://hub.driven.com.br/computacao	Bora zerar o hub? #goDriven #Bora	2022-10-20 21:57:55.237769
81	16	http://google.com	Nathalia e Yago #wild	2022-10-26 19:50:43.412392
25	13	https://goo.gl	Um encurtador antigo do Google. #testando ###comvariashastagas teste## #aa# ##a# #a## ##a##	2022-10-20 22:31:50.509232
26	13	https://cat.http	Acho que esse é o link dos status code. Esqueci de testa com hífen. #hashtag-com-hifen	2022-10-20 22:34:25.333668
30	7	http://test.com	Testing post	2022-10-21 18:26:48.75272
31	7	http://test.com	Timeline #test	2022-10-21 18:41:28.787712
32	7	http://www.twitter.com		2022-10-21 18:41:52.977843
33	7	http://www.wikpedia.com	Timeline new Post	2022-10-21 18:42:32.155164
34	7	https://www.wikipedia.com		2022-10-21 18:43:04.544334
35	7	http://www.aaa.com	aaa	2022-10-21 18:46:14.622821
37	7	https://www.aaa.com		2022-10-21 18:46:50.126947
38	7	https://www.google.com		2022-10-21 18:46:58.029662
39	7	htttps://www.driven.com.br	Testing form clear	2022-10-21 18:49:50.759523
40	7	 htttps://www.driven.com.br	Testing form	2022-10-21 18:56:11.06306
41	7	 htttps://www.driven.com.br	#form	2022-10-21 18:57:47.651179
42	7	htttps://www.driven.com.br	FOMR	2022-10-21 18:59:31.918563
43	7	htttps://www.driven.com.br	Last one	2022-10-21 18:59:59.752075
44	7	https://driven.com.br	Dribe	2022-10-21 19:04:18.456742
19	7	www.duckduckgo.com	Vai Pato Pato	2022-10-20 20:32:23.068165
46	7	https://www.duckduckgo.com	Go #duck	2022-10-22 19:24:42.679329
47	7	https://www.duckduckgo.com	Go #duck	2022-10-22 19:26:07.556921
48	7	https://duckduckgo.com	Go #duck yourself!	2022-10-22 19:27:27.762292
49	7	https://google.com	Testing no #hashtags	2022-10-22 20:14:12.445559
45	10	https://www.linkedin.com/in/nayesteves/	novamente testando	2022-10-21 21:38:03.142868
27	15	www.orkut.com	nossa primeira rede social	2022-10-21 18:21:37.365664
55	13	https://twitch.tv	Estou #testando #novas#hashtags	2022-10-24 16:48:01.512274
54	13	https://microsoft.com	Testando algumas #hashtags #aqui	2022-10-23 01:17:41.405101
56	13	https://www.netflix.com	Novas #tentativas #de	2022-10-24 16:49:05.626603
57	13	https://www.netflix.com	Novas #tentativas #de	2022-10-24 16:52:43.064619
82	13	https://dra.io	Com #novanovissima #novissima	2022-10-28 00:34:37.249272
84	13	https://twitter.com	Testando #snake_case e #com-hífen	2022-10-28 20:08:52.742661
83	15	https://www.g1.com	site novo	2022-10-28 16:40:50.018164
59	13	https://nintendo.com	#Breath #of #The #Wild	2022-10-24 17:29:13.959245
60	13	https://nintendo.com	#Breath #of #Wild	2022-10-24 17:29:23.320814
61	13	https://nintendo.com	#Breath #Wild	2022-10-24 17:29:27.849374
53	15	www.bing.com	adojawdpoiwjodijsad	2022-10-23 01:09:45.161925
62	7	https://www.amazon.us	New sales #today!!	2022-10-24 20:59:22.404314
63	19	https://www.google.com	Teste de post com #hashtag!	2022-10-24 21:03:22.514904
64	19	https://www.google.com	Exemplo de post sem hashtag	2022-10-24 21:09:41.707701
67	16	http://google.com	Um sitezinho de buscas #busca #trending	2022-10-24 21:10:28.160712
68	19	https://www.driven.com.br		2022-10-24 21:10:39.553561
\.


--
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public."postsHashtags" (id, "postId", "hashtagId") FROM stdin;
12	59	49
13	59	50
14	59	51
15	59	52
16	60	49
17	60	50
18	60	52
19	61	49
20	61	52
21	54	38
23	23	58
24	62	59
25	63	60
27	81	52
30	82	66
31	82	67
33	84	69
34	84	70
\.


--
-- Data for Name: reposts; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.reposts (id, "userId", "postId", "createdAt") FROM stdin;
3	15	67	2022-10-25 22:16:39.899436
4	19	68	2022-10-25 22:17:43.333417
5	16	68	2022-10-25 22:17:58.066799
6	7	68	2022-10-25 22:18:03.120013
7	13	68	2022-10-25 22:20:24.666069
8	13	67	2022-10-25 22:21:24.920195
9	13	64	2022-10-25 23:03:48.726324
10	15	64	2022-10-25 23:05:08.916076
11	7	64	2022-10-25 23:05:35.720839
12	15	68	2022-10-25 23:08:29.256115
13	15	44	2022-10-25 23:12:13.060454
14	7	44	2022-10-25 23:13:35.952213
15	15	1	2022-10-26 00:27:19.556462
17	15	6	2022-10-26 00:29:15.328003
18	15	80	2022-10-26 19:17:52.454971
19	15	61	2022-10-26 19:18:47.554159
20	7	61	2022-10-26 19:19:19.614181
21	13	61	2022-10-26 19:19:59.531683
22	18	68	2022-10-28 17:29:37.422055
23	18	45	2022-10-28 17:32:39.264964
24	18	83	2022-10-28 18:28:01.005353
28	15	16	2022-10-28 21:06:27.813111
30	15	84	2022-10-28 21:07:56.313546
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.sessions (id, "userId", token, "createdAt") FROM stdin;
84	13	6f4adc69-fa53-4731-9083-8aaeb6f7ac55	2022-10-20 14:52:24.12352
85	13	434f005c-b204-425d-a932-0b427047330d	2022-10-20 15:01:09.049288
147	16	e3e6a0d7-5d5e-4b5e-83db-f83f2499194e	2022-10-22 12:37:51.391715
149	7	25e3ed7b-5bff-43a2-8eb7-0a7bcce1f246	2022-10-22 18:32:56.615774
150	7	10c1bfaf-7fff-4905-9880-334304a9c5a6	2022-10-22 18:37:37.508009
151	7	ef09b2f1-4bf3-4243-8326-18306935f824	2022-10-22 18:40:50.84125
152	7	f18ded1c-7459-4a1d-abae-8ee1b4e93c5b	2022-10-22 18:42:09.785917
153	7	10dd775a-9339-497f-9f5d-b9726f2dda0e	2022-10-22 18:42:58.475119
154	7	9da35a3f-28f8-44b9-a798-ac59d6941c6c	2022-10-22 19:09:19.407233
155	7	3fec9dea-766c-4459-a5d3-f70c2c42149b	2022-10-22 19:11:39.58672
156	7	1fd698ca-78a6-434b-bfd6-f8c578513ed8	2022-10-22 19:37:07.714666
101	13	e3ec248c-ece7-4b7a-a290-25b326bc9aff	2022-10-20 21:10:58.488869
157	7	21bfc535-ecd6-4d55-b836-3b801d66bad0	2022-10-22 20:00:05.732994
103	13	cef353cc-edc1-4ca0-9e15-f5b67fed148c	2022-10-20 22:15:15.41627
158	15	f938bd2a-bcc5-450d-9cce-2245bb11728a	2022-10-22 22:50:31.315665
160	13	4bb73383-9154-4515-9701-4af3b5fade7c	2022-10-23 00:51:01.457663
162	7	3ffc7d61-437e-49d1-a0f9-13247beed249	2022-10-23 02:33:27.866025
163	7	629f7ad4-d954-41fb-b5a7-b39f218ce359	2022-10-23 05:45:02.519898
164	7	e2fe2c47-e992-47a9-b40d-8ca01ed4155f	2022-10-23 05:48:05.730345
165	7	3e414fa4-9501-48bd-8796-78cd18c981e2	2022-10-23 05:53:53.346517
167	7	723d348d-8086-4e87-bca7-2a536ad9b4f0	2022-10-23 11:20:52.3121
115	6	2d7442be-6fdb-4e26-8554-8fe78ebf600c	2022-10-21 18:33:22.721987
173	18	acd963b9-26e7-45c3-a2bb-e2cbbc2b6bf0	2022-10-23 17:17:49.035199
177	15	41742790-f837-4c70-9840-40d2124578a0	2022-10-24 20:09:27.066624
178	18	65d87952-63e8-4876-b346-2f90c575ae2f	2022-10-24 20:24:28.174481
179	19	a8cf8df2-8922-43df-ae12-570e8b829aa4	2022-10-24 20:37:13.510113
183	16	34838808-274c-4685-9957-86ea86db076d	2022-10-25 01:15:22.471762
122	7	377775f1-0a21-4170-965d-ca19efcbf038	2022-10-21 20:52:23.854055
185	18	3c1bb2dd-4f16-49ae-8e14-a2f7104e60fb	2022-10-25 13:04:06.955727
69	5	8d980555-8a1f-425b-88f2-3ed6ab445ecb	2022-10-19 22:43:27.988058
127	7	ccd1191d-263d-4a54-9f2c-156abe88f3e7	2022-10-22 03:35:17.094567
71	5	305ef838-a1cd-4003-b565-2a301263dcc4	2022-10-19 23:38:18.180315
128	7	91745ba8-2979-48a7-8997-4ba0356a6973	2022-10-22 04:13:43.785825
192	13	f4b5229d-39f5-48da-8f65-72b587444a89	2022-10-25 17:28:44.808629
195	15	f030887b-f108-49fe-b4ef-ae7387f4ac9f	2022-10-25 20:26:27.580155
196	16	de42c8b4-708c-49cd-b77f-f7f2a276d042	2022-10-25 21:06:43.740069
197	13	0a2c7abb-9a36-482b-bf71-053215777322	2022-10-25 21:06:49.934763
198	10	b03730b5-8237-4421-8538-3586d5d513ad	2022-10-25 21:14:07.310566
200	20	cb66ba18-9b79-4782-bf8d-ffb8df756d9e	2022-10-25 21:22:20.814455
201	15	af3da329-cf3a-4726-bee2-636b480c4be2	2022-10-26 00:25:06.530888
202	7	35f95177-126a-4b64-b846-e8b576210c3e	2022-10-26 11:22:03.2456
204	10	7774e82d-6b11-4ba7-aa8f-b5a3a8792b20	2022-10-26 13:55:47.981066
207	7	3df0a5ef-ade0-405c-bf7f-073cd55b472f	2022-10-26 15:37:40.919711
208	10	29c42662-b411-4504-8110-2fa388d10563	2022-10-26 17:45:00.379249
209	18	400a86cd-2d5e-4d20-a277-ddefd7d61248	2022-10-26 18:06:30.963686
210	18	f4b31280-dfc5-4f46-8588-5f17b7a5a4e5	2022-10-26 18:06:42.848107
212	10	1019f056-404c-43dc-86cd-a6c3b218d312	2022-10-26 22:44:59.313078
214	10	30331c45-b2c1-4fc5-be25-7360965ea77d	2022-10-27 13:59:50.604506
216	7	b37882a6-7a49-4017-ba9f-eb5c89143823	2022-10-27 19:20:37.335445
219	7	49b7b74d-5ff6-457d-9c6b-c03a7e05307e	2022-10-27 21:57:42.671625
220	7	b56e5997-a59b-4947-b426-0b0ce68a89b5	2022-10-27 22:00:53.756762
221	7	cfae71f7-cddc-4406-9b48-103e7c094149	2022-10-28 01:51:02.30785
222	7	031a3914-c7cf-488b-9495-9b4791abceb5	2022-10-28 02:27:20.261456
223	10	ab83e772-79d5-412d-8ee9-096de2df0326	2022-10-28 19:00:01.955116
225	18	f9926a1f-cfb6-4f85-9733-02355b1c72dc	2022-10-28 19:01:47.520518
226	18	5f77ee89-d6cc-4da3-b48c-021e5c1b8465	2022-10-28 19:01:53.825989
227	15	a1e0fd75-4cc8-4e2d-8dde-be2ccb870a77	2022-10-28 19:26:52.749874
229	7	2676e356-6daa-4240-8d9a-a47e9c52277c	2022-10-28 20:04:04.535366
231	15	0126d162-6b14-48a5-a446-59b4428d3023	2022-10-28 20:27:27.976095
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: fkwuwkslxyhcap
--

COPY public.users (id, name, email, img, password, "createdAt") FROM stdin;
1	Bolinha	a@a.com	\N	$2b$10$dTzbLePPYiyW4Psu7xJIGevNc8ykfOohe7KxKhtWOjYu4U7Zzouja	2022-10-19 05:29:10.08185
2	Nathalia	nath@doslivros.com	\N	$2b$10$cjiJwdvYXh8eottk2PXj/.b0Qd.LJuR1TZnKKFhscV4iyPAFGtrS.	2022-10-19 06:01:17.931577
3	Yago	yago@yago.com	\N	$2b$10$gh5uawPC.bEppfd6NaQzP.j8OEfHIUWwA.e6MnGCiT4R.01fW6c.y	2022-10-19 07:22:45.165526
4	Gabriel	gabriel@driven.com	\N	$2b$10$3zDzSNQQzzAWzlz6yRFf5uLyXOL5yE/pXuZMRldX.fCzxDKS/.V1e	2022-10-19 09:13:59.952606
5	Leandro	lele@driven.com	\N	$2b$10$PomcyrtixArMB3D9BxnR8u2FxadtBRH49HO04PCFj4tyEjDNyXcAG	2022-10-19 09:28:21.068053
6	Yago	yago@driven.com	https://3.bp.blogspot.com/-6V5dBxqujc8/V4yZ9WPmkTI/AAAAAAAAA6g/I-bccdWBNfs35HrzOChXjTHr2_PzXU6eQCEw/s1600/Sakura.png	$2b$10$VLuOour6voxWFCU0cHo/uuNvGvR11aweVxiECqpcqI3h2ykvBYkqS	2022-10-19 09:41:47.356458
7	Fekete Bruno	fekete@fekete.com	https://i.imgur.com/EkWrtQ7.gif	$2b$10$AoSZxa5Vxf6EeIh3yYxhMeZSxlK/Xh/vWw6ZfhivnfkeXxEb1v4/G	2022-10-19 12:24:24.708158
8	a	yagoo@driven.com	\N	$2b$10$7STEZ7e3xTpIKw92X2cbD.YBlJ9WH8pjq76xO6gwHefmIJQvJxThu	2022-10-19 12:31:14.474796
9	Yago	yagooo@driven.com	\N	$2b$10$S7xN4OBnFqrh5vF7tb3oZ..pn7BeRkUEzA/4kNSdBoqLAFRKTIo5.	2022-10-19 12:33:05.075273
10	Nay	naynay@nay.com	\N	$2b$10$P8bSBcpgC/YWNopqYVdrxemMl.S3AF8vwKcd6Z7QcM3O6WrZqFRK6	2022-10-19 14:10:49.678336
11	Dua Lipa	dualipa@driven.com	https://i.pinimg.com/736x/20/af/e4/20afe4947d01cea4e24ca6b583d52560.jpg	$2b$10$G7JTK1nL9JwsQFtXS8y0fuPSDMHO9.QmC43Jg1Q5agQjFvLSsNcQm	2022-10-19 20:36:19.532242
12	Vovó Juju	vovojuju@driven.com	https://i.pinimg.com/originals/c5/4f/41/c54f4189e5dbaa50b1057d66006642d7.jpg	$2b$10$nQ7a9GdNnvjafjMr1.sfOOLXoNxXPOmcpVogzXiiWYOZ/aOP0zb8G	2022-10-19 20:38:43.120298
13	lucas_e_suas_hashtags	lucas@email.com	\N	$2b$10$AGGJh4lewI36ni3q0hVysOoHSuPL9HYlXKFkuZBi8okyK5ynUO3MO	2022-10-20 14:51:49.99521
14	joaozinho	jj@jj.com	\N	$2b$10$W5ndVS269wsMb7vPFWeO6e2tfy1dhR6yTL2df3BWDqLcIFIaM.EA.	2022-10-20 18:07:04.973177
15	savio	teste@gmail.com	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS54088iJjHpn-y9FCxGAh5NBEdHugwIXewWQ&usqp=CAU	$2b$10$K/8oZEEYxaUxaLy8T3gGQudt0N4DJwZZyJsTShBs34xNXapfHh.Ue	2022-10-20 19:25:37.381882
16	Nayara	nay@driven.com	\N	$2b$10$IXdZeu9h6uf7tQwQtSHTX.sFoFA4gMuALDA9g/UCbGc32V50cIZwq	2022-10-21 00:00:35.389456
17	Ana	ana@driven.com	\N	$2b$10$RVxNCDCk4YRcUQlS2TjokOpxXQwGK1ygpodesM5jTsYe3DlquO.0u	2022-10-21 18:40:55.733836
18	Nezuko	nezuko@dm.com	https://www.icegif.com/wp-content/uploads/2022/06/icegif-793.gif	$2b$10$YHDbiA/ziMMh0QNnGZ5LPO8NBpnsd8L9Pw2vdnYgsgZK6lndMupA6	2022-10-23 16:49:46.575864
19	Usuário de Teste	linkrteste@teste.com	\N	$2b$10$Xhuo8/eta7v8N90qdTw86uSW3PH5Xw2dyEtRZPwULvaAiMv5WXq2q	2022-10-24 20:36:57.381015
20	Bruno	bruno@driven.com	http://vignette1.wikia.nocookie.net/sakuracardcaptors/images/e/ee/Sakura_anime.jpg/revision/latest?cb=20150529182027&path-prefix=es	$2b$10$d8AwFf8GTvbNq.6bKPKZT.aQuQl0KYXNt18GR.A.EdKmlKMgQGVTC	2022-10-25 15:15:59.509011
21	Savio	savio@driven.com	http://naruishak1994.n.a.pic.centerblog.net/o/37edceec.jpg	$2b$10$7I/pfhPm69D0dv9Nf/oJqek3tY.djvd7/ApD61U/H0..PHETM2rYm	2022-10-25 16:10:00.7706
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.comments_id_seq', 35, true);


--
-- Name: follows_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.follows_id_seq', 86, true);


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 70, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.likes_id_seq', 156, true);


--
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 34, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.posts_id_seq', 84, true);


--
-- Name: reposts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.reposts_id_seq', 30, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.sessions_id_seq', 231, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fkwuwkslxyhcap
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: follows follows_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT follows_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_hashtag_key; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_hashtag_key UNIQUE (hashtag);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: postsHashtags postsHashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_pkey" PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: reposts reposts_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT reposts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments comments_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: follows follows_followedId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES public.users(id);


--
-- Name: follows follows_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.follows
    ADD CONSTRAINT "follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public.users(id);


--
-- Name: likes likes_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: likes likes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: postsHashtags postsHashtags_hashtagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- Name: postsHashtags postsHashtags_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: posts posts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: reposts reposts_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_postId_fkey" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- Name: reposts reposts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.reposts
    ADD CONSTRAINT "reposts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fkwuwkslxyhcap
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: SCHEMA heroku_ext; Type: ACL; Schema: -; Owner: u8vapk8eu46440
--

GRANT USAGE ON SCHEMA heroku_ext TO fkwuwkslxyhcap;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: fkwuwkslxyhcap
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO fkwuwkslxyhcap;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO fkwuwkslxyhcap;


--
-- PostgreSQL database dump complete
--

