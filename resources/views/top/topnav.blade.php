<header id="header" class="header d-flex align-items-center">

    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="{{ route('studentDash') }}" class="logo d-flex align-items-center">
            <!-- Uncomment the line below if you also wish to use an image logo -->
            <!-- <img src="assets/img/logo.png" alt=""> -->
            <h1>LI-TO-L<span>.</span></h1>
        </a>
        <nav id="navbar" class="navbar">
            <ul>
                <li><a href="{{ route('studentDash') }}">Home</a></li>
                <li><a href="{{ route('learn') }}">Learn</a></li>
                <li><a href="{{ route('retain') }}">Retain</a></li>
                <li><a href="{{ route('request') }}">Request Gallery</a></li>
                <li><a href="{{ route('about') }}">About Us</a></li>
                <li><a href="{{ route('team') }}">Team</a></li>
                <li><a href="{{ route('testimonial') }}">Testimonials</a></li>
                <li><a href="{{ route('pros') }}">Profile</a></li>
                <li><a href="{{ route('logout') }}">Logout</a></li>
            </ul>
        </nav><!-- .navbar -->

        <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

    </div>
</header>
