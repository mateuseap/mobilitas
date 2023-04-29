#include <bits/stdc++.h>
using namespace std;

mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());

const int MAXN = 800;
typedef pair<int, int> ii;

vector<int> g[MAXN];
vector<vector<ii>> path;
ii tOpen[MAXN];
ii tClose[MAXN];
int spendTime[MAXN];

// naive
vector<ii> naive_time;

// sAnnealing
vector<ii> final_time;

void readInput(){
	freopen("data.in", "r", stdin);

	int M;
	cin >> M;

	for(int i=0;i<M;i++){
		int id1, id2;
		cin >> id1 >> id2;
		g[id1].push_back(id2);
		g[id2].push_back(id1);
	}

	int sz;
	cin >> sz;
	vector<ii> aux;
	for(int i=0;i<sz;i++){
		int id1, id2;
		cin >> id1 >> id2;
		aux.push_back({id1, id2});
	}
	path.push_back(aux);
	fclose(stdin);

	int Q = 1e3;

	for(int i=0;i<Q;i++){
		sz = uniform_int_distribution<int>(1, 200)(rng);

		int root = uniform_int_distribution<int>(1, MAXN-1)(rng);
		while(g[root].size() == 0){
			root = uniform_int_distribution<int>(1, MAXN-1)(rng);
		}

		vector<ii> aux;

		for(int j=0;j<sz;j++){
			int pos = uniform_int_distribution<int>(0, (int)g[root].size() - 1)(rng);
			aux.push_back({root, g[root][pos]});

			root = g[root][pos];
		}

		path.push_back(aux);
	}

	for(int i=0;i<MAXN;i++){
		int spend = uniform_int_distribution<int>(5, 30)(rng);
		spendTime[i] = spend;
		int t1, t2;
		t1 = uniform_int_distribution<int>(10, 60)(rng);
		t2 = uniform_int_distribution<int>(t1, 60)(rng);
		tOpen[i] = make_pair(t1, t2);
		t1 = uniform_int_distribution<int>(10, 60)(rng);
		t2 = uniform_int_distribution<int>(t1, 60)(rng);
		tClose[i] = make_pair(t1, t2);
	}
}

auto getneighborhood(auto S){
	vector<ii> Si;
	for(int i=0;i<S.size();i++){
		int delta = uniform_int_distribution<int>(-1, 1)(rng);
		int open_t = min(S[i].first + delta, tOpen[i].second);
		open_t = max(open_t, tOpen[i].first);

		delta = uniform_int_distribution<int>(-1, 1)(rng);
		int close_t = min(S[i].second + delta, tClose[i].second);
		close_t = max(close_t, tClose[i].first);

		Si.push_back({open_t, close_t});
	}

	return Si;
}

double partialScore(auto S, auto &carr){
	int wait = 0.0;
	int curr_time = 0;

	for(int j=0;j<carr.size();j++){
		int id = carr[j].first;

		curr_time += spendTime[id];

		int green = S[id].first;
		int red = S[id].second;

		int clock = curr_time%(green + red);

		if(clock <= green) continue;
		clock -= green;
		curr_time += red - clock;

		wait += red - clock;
	}

	double cost = (double)wait/curr_time;
	return cost;
}

double score(auto S){
	double ret = 0.0;

	for(int i=0;i<path.size();i++){
		ret += partialScore(S, path[i]);
	}

	return ret;
}

void simulatedAnnealing(){
	vector<ii> S;
	for(int i=0;i<MAXN;i++){
		int t1, t2;
		t1 = uniform_int_distribution<int>(tOpen[i].first, tOpen[i].second)(rng);
		t2 = uniform_int_distribution<int>(tClose[i].first, tClose[i].second)(rng);
		S.push_back(make_pair(t1, t2));
	}

	for(int i=0;i<MAXN;i++){
		naive_time.push_back(S[i]);
	}

	/************* setar isso aqui inicialmente
	S0 = estado inicial
	M = numero maximo de iteracoes
	P = pertubacoes por iteracao
	L = numero maximo de sucessos por iteracoes
	alpha = fator de reducao da temperatura
	******************************************/
	double T = 200.0;
	const int M = 3000;
	double alpha = 0.997;
	const int P = 10;

	double score_s = score(S);
	double naive_score = score_s;
	double naive_partial = partialScore(S, path[0]);

	int EPOCH = 1;

	for(int i=0;i<=M;i++){
		for(int j=0;j<=P;j++){
			auto Si = getneighborhood(S);
			double score_si = score(Si);
			double delta = score_si - score_s;

			double pscore = partialScore(Si, path[0]);
			if(score_si > naive_score){
				naive_score = score_si;
			}
			if(pscore > naive_partial){
				naive_partial = pscore;
			}

			// energia negativa -> melhor solucao
			if(delta <= 0.0 || exp(-delta/T) > uniform_real_distribution<double>(0, 1.0)(rng)){
				S = Si;
				score_s = score_si;
			}
		}
		T = T*alpha;

		if(i%EPOCH == 0){
			cerr << fixed << setprecision(3);
			cerr << "T: " << T << ", " << i << "/" << M << ", score: " << score_s << endl;
		}
	}

	for(int i=0;i<MAXN;i++){
		final_time.push_back(S[i]);
	}

	freopen("sol.out", "w", stdout);
	vector<int> valid_ids;

	for(int i=0;i<S.size();i++){
		if(g[i].size() == 0) continue;
		valid_ids.push_back(i);
	}

	cout << valid_ids.size() << endl;
	for(int i=0;i<valid_ids.size();i++){
		int id = valid_ids[i];
		cout << id << " " << S[id].first << " " << S[id].second << endl;
	}
	cout << naive_score << " " << score_s << endl;
	cout << naive_partial << " " << partialScore(S, path[0]) << endl;
	fclose(stdout);
}

int main(){
	readInput();
	simulatedAnnealing();
}