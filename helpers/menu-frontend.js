const getMenuFronEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
            titulo: 'Menu',
            icono: 'home',
            submenu: [
                {
                    titulo: 'Inicio Panel', url: '/gestor/inicio'
                },
                {
                    titulo: 'Inicio SOLF', url: '/inicio'
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
                        titulo: 'Jornadas', url: '/gestor/jornadas'
                    },
                    {
                        titulo: 'Equipos', url: '/gestor/equipos'
                    },
                    {
                        titulo: 'Jugadores', url: '/gestor/jugadores'
                    },
                    {
                        titulo: 'Logo', url: '/gestor/logo'
                    },
                    {
                        titulo: 'Carrusel', url: '/gestor/carruseles'
                    },                    
                    {
                        titulo: 'Estadios', url: '/gestor/estadios'
                    },                    
                    {
                        titulo: 'Resultados', url: '/gestor/resultados'
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

