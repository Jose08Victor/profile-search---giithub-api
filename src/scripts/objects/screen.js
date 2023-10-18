import { maxItems } from './src/scripts/variables.js'

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>

                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <br>
                                            <p>Following: ${user.following}</p>
                                            <p>Followers: ${user.followers}</p>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<a href="${repo.html_url}" target="_blank">
                                                                    <li>
                                                                        <p class="repo-name">${repo.name}</p>

                                                                        <div>
                                                                             <p>🍴${repo.forks_count}</p>
                                                                             <p>⭐${repo.stargazers_count}</p>
                                                                             <p>👀${repo.watchers_count}</p>
                                                                             <p>💻${repo.language ?? '-'}</p>
                                                                        </div>
                                                                    </li>
                                                                </a>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                             <h2>Repositories</h2>
                                             <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventsItens = ''
        let i = 0
        user.events.forEach(async event => {
            let eventsMessages = event.payload.commits[0].message
            eventsItens += `<li><span>${event.repo.name}</span> - ${eventsMessages}</li><br>`

            if (i < maxItems) i++
        })
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div>
                                             <h2>Events</h2>
                                             <br>
                                             <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }