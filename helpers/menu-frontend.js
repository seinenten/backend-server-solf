const getMenuFronEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
            titulo: 'Menu',
            icono: 'home',
            submenu: [
                {
                    titulo: 'Inicio', url: '/inicio'
                },
                {
                    titulo: 'Mi cuenta', url: '/gestor/perfil'
                },
            ]
        },
    ];

    if (role === 'ADMIN_ROLE') {
        menu.push(
            {
            titulo: 'Mantenimientos',
            icono: 'settings',
            submenu: [
                    {
                        titulo: 'Usuarios', url: '/gestor/usuarios'
                    },
                    {
                        titulo: 'Ligas', url: '/gestor/ligas'
                    },
                    {
                        titulo: 'Equipos', url: '/gestor/equipos'
                    },
                    {
                        titulo: 'Jugadores', url: '/gestor/jugadores'
                    },
                    {
                        titulo: 'Carrusel', url: '/gestor/carruseles'
                    }
                ]
            },
            // {
            //     titulo: 'Respaldos',
            //     icono: 'edit',
            //     submenu: [
            //         {
            //             titulo: 'carrusel', url: '/gestor/pepe'
            //         },
            //         {
            //             titulo: 'icono', url: '/gestor/pepe'
            //         }
            //     ]
            // },
            {
                titulo: 'Respaldos',
                icono: 'edit',
                submenu: [
                    {
                        titulo: 'Repaldos', url: '/gestor/restaurar'
                    },
                ]
            }
        )
    }

    return menu;

}

module.exports = {
    getMenuFronEnd
}

