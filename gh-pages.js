var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/JTimNolan/idle-game-client.git' // Update to point to your repository
    },
    () => {
        console.log('Deploy Complete!')
    }
)