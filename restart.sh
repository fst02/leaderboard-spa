killall screen
screen -dmS leaderboard-spa-backend bash -c 'cd backend;npm run watch-and-log'
screen -dmS leaderboard-spa-frontend bash -c 'cd frontend;npm run serve-and-log'
sleep 1s
screen -ls
