$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio 𝕬𝖒𝖆𝖓";
            $("#favicon").attr("href", "./static/images/hero.jpeg");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "./static/images/favhand.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("static/js/projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let projectsHTML = "";
        projects.forEach(project => {
                // Check if links are valid (not empty and not just "#")
                const hasViewLink = project.links.view && project.links.view !== '#' && project.links.view.trim() !== '';
                const hasCodeLink = project.links.code && project.links.code !== '#' && project.links.code.trim() !== '';
                
                // Build button HTML only for valid links
                let buttonsHTML = '<div class="btns">';
                if (hasViewLink) {
                        buttonsHTML += `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
                }
                if (hasCodeLink) {
                        buttonsHTML += `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;
                }
                buttonsHTML += '</div>';
                
                projectsHTML += `
                <div class="grid-item ${project.category}">
                    <div class="box tilt">
                        <img draggable="false" src="./static/images/projects/${project.image}.png" alt="project" />
                        <div class="content">
                            <div class="tag">
                                <h3>${project.name}</h3>
                            </div>
                            <div class="desc">
                                <p>${project.desc}</p>
                                ${buttonsHTML}
                            </div>
                        </div>
                    </div>
                </div>`
        });
        projectsContainer.innerHTML = projectsHTML;

        // Wait for images to load before initializing Isotope/tilt to avoid layout glitches
        const imgs = projectsContainer.querySelectorAll('img');
        let imagesToLoad = imgs.length;

        function finalizeLayout() {
                // Initialize VanillaTilt for hover effect
                if (typeof VanillaTilt !== 'undefined') {
                        VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 12 });
                }

                // Use pure CSS Grid instead of Isotope for layout
                // Only use Isotope for filtering functionality
                var $grid = $('.box-container');
                
                // Store all items
                var $items = $grid.find('.grid-item');
                
                // filter items on button click
                $('.button-group').on('click', 'button', function () {
                        $('.button-group').find('.is-checked').removeClass('is-checked');
                        $(this).addClass('is-checked');
                        var filterValue = $(this).attr('data-filter');
                        
                        if (filterValue === '*') {
                                // Show all items
                                $items.show();
                        } else {
                                // Hide all, then show filtered
                                $items.hide();
                                $items.filter(filterValue).show();
                        }
                });
        }

        if (imagesToLoad === 0) {
                finalizeLayout();
        } else {
                imgs.forEach(img => {
                        if (img.complete) {
                                imagesToLoad--;
                        } else {
                                img.addEventListener('load', () => {
                                        imagesToLoad--;
                                        if (imagesToLoad === 0) finalizeLayout();
                                });
                                img.addEventListener('error', () => {
                                        // treat errored image as loaded to avoid blocking
                                        imagesToLoad--;
                                        if (imagesToLoad === 0) finalizeLayout();
                                });
                        }
                });
                // In case all images were already cached/complete
                if (imagesToLoad === 0) finalizeLayout();
        }
}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

// diUchitkar developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}