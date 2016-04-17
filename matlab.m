x = [0 0.3 0.4]';
y = [0 0.3 0.3]';
xx = [0.2 0.3 0.35]';
yy = spline(x,y,xx);
plot(x,y,'o',xx,yy)